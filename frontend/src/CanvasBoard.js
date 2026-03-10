import React, { useState, useEffect, useRef } from "react";
import p5 from "p5";
import { getPoints, postPoint, clearBoard } from "./api";

export default function CanvasBoard() {
  const containerRef = useRef(null);
  const p5Ref = useRef(null);
  const [points, setPoints] = useState([]);
  const pointsRef = useRef(points);
  useEffect(() => { pointsRef.current = points; }, [points]);
  const [color] = useState(() => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  });
  const userId = useRef(Math.random().toString(36).substring(2, 9)).current;
  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas(800, 600);
        p.background(255);
      };

      p.draw = () => {
        p.background(255);
        pointsRef.current.forEach((pt) => {
          p.noStroke();
          p.fill(pt.color);
          p.ellipse(pt.x, pt.y, 10, 10);
        });
      };

      p.mousePressed = () => {
        if (p.mouseX >= 0 && p.mouseY >= 0 && p.mouseX <= p.width && p.mouseY <= p.height) {
          const pt = { x: p.mouseX, y: p.mouseY, color: color, userId };
          const newList = [...pointsRef.current, pt];
          pointsRef.current = newList;
          setPoints(newList);
          postPoint(pt).catch((e) => {
            console.error("Error al enviar punto:", e);
          });
        }
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);
    return () => {
      if (p5Ref.current) {
        p5Ref.current.remove();
        p5Ref.current = null;
      }
    };
  }, [color, userId]);
  useEffect(() => {
    let mounted = true;

    const load = () => {
      getPoints()
        .then((data) => {
          if (!mounted) return;
          pointsRef.current = data;
          setPoints(data);
        })
        .catch((e) => {
          console.error("Error cargando puntos:", e);
        });
    };

    load();

    const id = setInterval(load, 2000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  const handleClear = async () => {
    try {
      await clearBoard();
      pointsRef.current = [];
      setPoints([]);
    } catch (e) {
      console.error("Error al limpiar tablero:", e);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 8 }}>
        <button onClick={handleClear}>Clear Board</button>
        <span style={{ marginLeft: 12 }}>
          Tu color:
          <span style={{ display: "inline-block", width: 16, height: 16, background: color, border: "1px solid #000", marginLeft:8 }} />
        </span>
      </div>
      <div ref={containerRef}></div>
    </div>
  );
}
