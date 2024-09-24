package com.example.graduation.Category.service;

import com.example.graduation.Category.dto.CategoryCreateRequest;
import com.example.graduation.Category.dto.CategoryDto;
import com.example.graduation.Category.entity.Category;
import com.example.graduation.Category.repository.CategoryRepository;
import com.example.graduation.Member.repository.UserRepository;
import com.example.graduation.exception.CategoryNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CategoryDto> findAll() {

        List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
        return CategoryDto.toDtoList(categories);
    }
    @Transactional
    public void createAtFirst() {
        Category category = new Category("Default", null);
        categoryRepository.save(category);
    }
    @Transactional
    public void create(CategoryCreateRequest req) {
        Category parent = Optional.ofNullable(req.getParentId())
                .map(id -> categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new))
                .orElse(null);
        categoryRepository.save(new Category(req.getName(), parent));
    }

    @Transactional
    public void delete(int id) {
        Category category = categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        categoryRepository.delete(category);
    }
}