package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Category;
import com.app.pojos.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

	List<Question> findByCategory(Category c);
	
	List<Question> findByDescriptionContainingAndCategory(String description, Category c);

}
