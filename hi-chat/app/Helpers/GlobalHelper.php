<?php 
use Illuminate\Support\Facades\Log;

if (! function_exists('logException')) {
    /**
     * Log detailed exception information.
     */
    function logException(Throwable $exception, string $logChannel = 'database')
    {
        // Get essential exception details
        $errorType = get_class($exception);
        $errorMessage = $exception->getMessage();
        $errorFile = $exception->getFile();
        $errorLine = $exception->getLine();
        $allBacktrace = $exception->getTrace();
        $appBacktrace = [];
        $vendorBacktrace = [];
        // Separate app backtrace (not in vendor) and vendor backtrace
        foreach ($allBacktrace as $index => $trace) {
            if (isset($trace['file'])) {
                if (str_contains($trace['file'], '/vendor/')) {
                    $vendorBacktrace[] = array_merge($trace, ['original_index' => $index]);
                } else {
                    $appBacktrace[] = array_merge($trace, ['original_index' => $index]);
                }
            }
        }
        // Select at least 3 backtrace entries from the app code, or fallback to vendor backtrace if not enough
        $minimalAppBacktrace = array_reverse(array_slice($appBacktrace, 0, 3));
        $remainingBacktrace = array_slice($vendorBacktrace, 0, max(8 - count($minimalAppBacktrace), 0));
        // Combine the backtrace
        $minimalBacktrace = array_merge($minimalAppBacktrace, array_reverse($remainingBacktrace));
        // Format backtrace as a plain string
        $formattedBacktrace = collect($minimalBacktrace)
            ->map(function ($trace, $index) {
                $file = $trace['file'] ?? 'N/A';
                $line = $trace['line'] ?? 'N/A';
                $function = $trace['function'] ?? 'N/A';
                $originalIndex = $trace['original_index'];

                return "#{$originalIndex} {$file} ({$line}): {$function}";
            })
            ->implode("\n");
        // Create a user-friendly error message
        $logMessage = sprintf(
            "Exception caught: [%s] %s in %s:%d\nMinimal Backtrace:\n%s",
            $errorType,
            $errorMessage,
            $errorFile,
            $errorLine,
            $formattedBacktrace
        );
        // Log the error using the specified channel (default is 'database')
        Log::channel($logChannel)->error($logMessage);
    }
}
