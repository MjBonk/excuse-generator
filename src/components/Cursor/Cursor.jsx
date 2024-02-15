import "./Cursor.css";
import { useState, useEffect } from "react";

function Cursor() {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

	const [cursorImg, setCursorImg] = useState("/cursor/Cursor.png");

	useEffect(() => {
		function handleMouseMove(e) {
			setCursorPosition({ x: e.clientX, y: e.clientY });
		}

		function handleCursorDown() {
			setCursorImg("/cursor/Cursor--click.png");
		}

		function handleCursorUp() {
			setCursorImg("/cursor/Cursor.png");
		}

		window.addEventListener("pointermove", handleMouseMove);
		window.addEventListener("mousedown", handleCursorDown);
		window.addEventListener("mouseup", handleCursorUp);

		return () => {
			window.removeEventListener("pointermove", handleMouseMove)
			window.removeEventListener("mousedown", handleCursorDown);
			window.removeEventListener("mouseup", handleCursorUp);
		};
	}, []);

	return (
		<img
			src={cursorImg}
			className="cursor"
			style={{ top: cursorPosition.y - 7 + "px", left: cursorPosition.x - 3 + "px" }}
		></img>
	);
}

export default Cursor;
