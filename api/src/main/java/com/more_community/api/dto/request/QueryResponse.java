package com.more_community.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QueryResponse {
    public int status;
    public String message;
    public Object data;
    public Object errors;

    public QueryResponse(int status) {
        this.status = status;
    }

    public QueryResponse withMessage(String message) {
        this.message = message;

        return this;
    }

    public QueryResponse withData(Object data) {
        this.data = data;

        return this;
    }

    public QueryResponse withErrors(Object errors) {
        this.errors = errors;

        return this;
    }
}
