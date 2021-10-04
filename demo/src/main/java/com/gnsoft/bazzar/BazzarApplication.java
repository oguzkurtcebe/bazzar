package com.gnsoft.bazzar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

import com.gnsoft.bazzar.image.Configuration;
import com.gnsoft.bazzar.image.ImageKit;
import com.gnsoft.bazzar.image.Utils;


@SpringBootApplication
@EnableMongoAuditing
public class BazzarApplication {
	
	//test commit
	//test commit 2

	public static void main(String[] args) throws Throwable {
		SpringApplication.run(BazzarApplication.class, args);
		ImageKit imageKit=ImageKit.getInstance();
        //getSystemConfig(Class<?> cls) method need current class as parameter
        Configuration config = Utils.getSystemConfig(BazzarApplication.class);
        imageKit.setConfig(config);

	}

}
