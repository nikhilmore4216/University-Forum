package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Category;
import com.app.pojos.Role;
import com.app.service.ICategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	private ICategoryService catService;
	
	@GetMapping("/{role}")
	public ResponseEntity<?> fetchCategoryTitles(@PathVariable("role") Role role) {		
		return ResponseEntity.ok(catService.fetchAllCategoryNames(role));
	}
	
	@PostMapping
	public ResponseEntity<?> createCategory(@RequestBody Category c) {
		return new ResponseEntity<>(catService.createCategory(c), HttpStatus.CREATED);
	}
	
}
