package br.charles.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.charles.model.User;
import br.charles.model.mongo;
import br.charles.service.CidadesDB;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class DictionaryController {
		
	private Double imc;
	private String resultado;
	
	private ArrayList<mongo> dictonaryList = new ArrayList<mongo>();
	private ArrayList<User> userList = new ArrayList<User>();
	
	@Autowired
	CidadesDB cidadesDB;
	
	@PostMapping(value = "/dictionary")
	public mongo postItemDictionary(@RequestBody mongo itemDictonary) {
		
		if (itemDictonary != null) {
			this.dictonaryList.add(itemDictonary);
			return itemDictonary;
		}
		
		return null;
	}
	
	@GetMapping(value = "/dictionary/{chave}")
	public String findValorByChave(@PathVariable final Integer chave) {
		
		if (chave != null) {
			for (mongo dictonary : dictonaryList) {
				
				if (chave == dictonary.getChave()) {
					return dictonary.getCidade();
				}
			}
		}
		
		return null;
	}
	
	@GetMapping(value = "/dictionary/all")
	public ArrayList<mongo> findAll() {

		return this.dictonaryList;
	}

	@GetMapping(value = "/dictionary/load")
	public ArrayList<mongo> loadItens() {

		this.dictonaryList.addAll(cidadesDB.loadItens());

		return this.dictonaryList;
	}
	
	
	
	@RequestMapping(value = "/imc/{peso}/altura/{altura}")
	public String findImcByPesoAndAltura(@PathVariable final Double peso, @PathVariable final Double altura) {
		
		this.imc = peso/(altura*altura);
		
		if (imc < 18.5)
			resultado = "MAGREZA";
		else if (peso < 18.5 && imc < 24.9)
			resultado = "NORMAL";
		else if (imc < 25 && imc < 29.9)
			resultado = "SOBREPESO";
		else if (imc < 30 && imc < 39.9)
			resultado = "OBESIDADE";
		else if (imc > 40)
			resultado = "OBESIDADE GRAVE";
		
		return resultado;
	}
	

	@PostMapping("/user")
	public User createContact(@RequestBody User user) {
		if(user != null){
			this.userList.add(user);
			return user;
		}
		return null;
	}

	@GetMapping(value = "/user/all")
	public ArrayList<User> findAllUser() {

		return this.userList;
	}
	
	
}
