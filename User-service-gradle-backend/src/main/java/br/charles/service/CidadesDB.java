package br.charles.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import br.charles.model.mongo;
import lombok.Data;

@Service
@Data
public class CidadesDB {
    private ArrayList<mongo> dictonaryList = new ArrayList<mongo>();

    public ArrayList<mongo> loadItens() {

        this.dictonaryList.add(new mongo(53, "Brasília"));
        this.dictonaryList.add(new mongo(23, "Fortaleza"));
        this.dictonaryList.add(new mongo(26, "Recife"));
        this.dictonaryList.add(new mongo(29, "Salvador"));

        return this.dictonaryList;
    }

}