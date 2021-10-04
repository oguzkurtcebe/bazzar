package com.gnsoft.bazzar.image;

public class QueryMaker {
    private String query;

    public void put(String q){
        if (null!=query){
            query+="&";
        }
        else {
            query="";
        }
        query+=q;
    }

    public String  get(){
        return query;
    }

}
