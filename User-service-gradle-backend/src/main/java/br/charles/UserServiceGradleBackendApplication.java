package br.charles;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import br.charles.controller.DictionaryController;
import br.charles.service.CidadesDB;

@SpringBootApplication
public class UserServiceGradleBackendApplication {

	@Autowired
	CidadesDB cidadesDB;
	
	public static void main(String[] args) {
		SpringApplication.run(UserServiceGradleBackendApplication.class, args);
	}
	
	@PostConstruct
	private void load() {
		cidadesDB.loadItens();
	}

}
