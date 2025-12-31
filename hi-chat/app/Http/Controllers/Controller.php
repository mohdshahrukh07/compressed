<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
abstract class Controller
{
    use AuthorizesRequests;
    use ValidatesRequests;

    protected function handleAction(callable $callback, bool $redirect = false)
    {
        try {
            // Execute the action
            return $callback();
        } catch (AuthorizationException $e) {
            if ($redirect) {
                return response(['status' => false, 'message' => $e->getMessage(), 'redirect' => true], 403);
            }

            return response(['status' => false, 'message' => $e->getMessage()], 403);
        } catch (QueryException $e) {
            logException($e);
            // check duplicate error code and return response
            if ($e?->errorInfo && $e?->errorInfo[1] == 1062) {
                return response(['status' => false, 'message' => __('duplicate_record_found')], 500);
            }
        } catch (ValidationException $e) {
            
            return response(['status' => false, 'errors' => $e->validator->errors()], 422);
        } catch (Exception $e) {
            logException($e);

            return response(['status' => false, 'message' => __('something_went_wrong')], 500);
        }
    }
}
