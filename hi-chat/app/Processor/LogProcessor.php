<?php

namespace App\Processor;

use ArrayAccess;
use Illuminate\Support\Facades\Auth;
use Monolog\LogRecord;
use Monolog\Processor\ProcessorInterface;

class LogProcessor implements ProcessorInterface
{
    protected array|ArrayAccess $serverData;

    public function __construct(array|ArrayAccess|null $serverData = null)
    {
        if ($serverData === null) {
            $this->serverData = &$_SERVER;
        } else {
            $this->serverData = $serverData;
        }
    }

    /**
     * @return array The processed record
     */
    public function __invoke(LogRecord $record)
    {
        if (! empty(Auth::user()->id)) {
            $record['extra']['user_id'] = Auth::user()->id;
        }

        $record['extra']['request_id'] = request()->getUniqueId();
        $extraFields = [
            'url' => 'REQUEST_URI',
            'ip' => 'REMOTE_ADDR',
            'http_method' => 'REQUEST_METHOD',
            'server' => 'SERVER_NAME',
            'referrer' => 'HTTP_REFERER',
            'user_agent' => 'HTTP_USER_AGENT',
        ];

        foreach ($extraFields as $extraName => $serverName) {
            $record['extra'][$extraName] = $this->serverData[$serverName] ?? null;
        }

        return $record;
    }
}
