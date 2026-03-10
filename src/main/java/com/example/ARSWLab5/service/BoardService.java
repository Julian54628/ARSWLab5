package com.example.ARSWLab5.service;

import com.example.ARSWLab5.model.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BoardService {

    private final List<Point> points = new ArrayList<>();

    public synchronized void addPoint(Point p) {
        points.add(p);
    }

    public synchronized List<Point> getPoints() {
        return new ArrayList<>(points);
    }

    public synchronized void clearBoard() {
        points.clear();
    }
}
