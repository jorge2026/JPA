
package com.example.bibliotecajpa.Controller;

import com.example.bibliotecajpa.entity.Empleado;
import com.example.bibliotecajpa.service.EmpleadoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/bib")
public class EmpleadoRestController {
    @Autowired
    private EmpleadoService empleadoService;
    
    @GetMapping("/all")
    public List<Empleado> getPosts() {
        return empleadoService.readAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Empleado> getPost(@PathVariable int id) {
        Empleado post = empleadoService.read(id);
        return ResponseEntity.ok(post);
    }
    
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable int id) {        
        empleadoService.delete(id);
    }
    
    @PostMapping("/add")
    public Empleado addPost(@RequestBody Empleado post) {  
        return empleadoService.create(post);
    }
    
    @PutMapping("/edit")
    public Empleado editPost(@RequestBody Empleado post) {  
        Empleado pos = new Empleado(post.getId(),post.getNombres(),post.getApellidos(),post.getDni());
        System.out.println(post.getId()+" , "+post.getNombres()+" , "+post.getApellidos()+" , "+post.getDni());
        return empleadoService.update(post);
    }
}
