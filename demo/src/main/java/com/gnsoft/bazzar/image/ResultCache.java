package com.gnsoft.bazzar.image;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.HashMap;
import java.util.Map;

public class ResultCache {
    private boolean isSuccessful;
    private String message;
    private String help;
    private String requestId;
    private String raw;

    public ResultCache() {
    }

    public boolean isSuccessful() {
        return isSuccessful;
    }

    public void setSuccessful(boolean successful) {
        isSuccessful = successful;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getHelp() {
        return help;
    }

    public void setHelp(String help) {
        this.help = help;
    }

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public Map<String,Object> getMap(){
        if (null!=raw) {
            return new Gson().fromJson(raw, new TypeToken<Map<String, Object>>() {
            }.getType());
        }
        return new HashMap<>();
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    @Override
    public String toString() {
        return "ResultCache{" +
                "isSuccessful=" + isSuccessful +
                ", message='" + message + '\'' +
                ", help='" + help + '\'' +
                ", requestId='" + requestId + '\'' +
                '}';
    }
}
