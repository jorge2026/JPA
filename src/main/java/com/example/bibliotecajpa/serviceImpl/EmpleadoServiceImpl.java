/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.bibliotecajpa.serviceImpl;

import com.example.bibliotecajpa.entity.Empleado;
import com.example.bibliotecajpa.repository.EmpleadoRepository;
import com.example.bibliotecajpa.service.EmpleadoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Victor Rosales
 */
@Service
public class EmpleadoServiceImpl implements EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Override
    public Empleado create(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @Override
    public Empleado update(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    @Override
    public void delete(int id) {
        empleadoRepository.deleteById(id);
    }

    @Override
    public Empleado read(int id) {
        return empleadoRepository.findById(id).get();
    }

    @Override
    public List<Empleado> readAll() {
        return empleadoRepository.findAll();
    }

}
