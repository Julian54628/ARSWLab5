package com.example.ARSWLab5.controller;

import com.example.ARSWLab5.model.Point;
import com.example.ARSWLab5.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/points")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping
    public List<Point> getPoints() {
        return boardService.getPoints();
    }

    @PostMapping
    public void addPoint(@RequestBody Point p) {
        boardService.addPoint(p);
    }

    @DeleteMapping
    public void clearBoard() {
        boardService.clearBoard();
    }
}
