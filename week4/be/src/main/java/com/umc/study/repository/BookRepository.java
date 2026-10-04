package com.umc.study.repository;

import com.umc.study.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // 1. 최신 등록순 정렬 조회 (book_id 내림차순)
    List<Book> findAllByOrderByBookIdDesc();

    // 2. 특정 카테고리 ID로 도서 목록 조회 (JPA 쿼리 메소드)
    List<Book> findByCategory_CategoryId(Long categoryId);
}