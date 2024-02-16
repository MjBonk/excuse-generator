import "./App.css";
import { useEffect, useState } from "react";
import { useOpenAI } from "./Hooks/useOpenAI";
import { ChakraProvider } from "@chakra-ui/react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import Hyperified from "../src/Data/Hyperified.json";
import ZeroFucks from "../src/Data/ZeroFucks.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Cursor from "./components/Cursor/Cursor";

function App() {
	const [response, setResponse] = useState(null);
	const [sliderValue, setSliderValue] = useState(20);
	const [isCopied, setIsCopied] = useState(false);

	const faces = [
		"/faces/og-face.png",
		"/faces/face1.png",
		"/faces/face2.png",
		"/faces/face3.png",
		"/faces/face4.png",
		"/faces/face5.png",
		"/faces/face6.png",
		"/faces/face7.png",
		"/faces/face8.png",
		"/faces/face9.png",
		"/faces/face10.png",
		"/faces/face11.png",
	];
	const [displayedImg, setDisplayedImg] = useState(faces[0]);

	const onCopyHandler = () => {
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2500); // Hide the success message after 2.5 seconds
	};

	function handleOnclick(e) {
		e.preventDefault();
		setDisplayedImg(faces[Math.floor(Math.random() * faces.length)]);

		// if value 0 do this:
		if (sliderValue === 0) {
			setResponse(ZeroFucks[Math.floor(Math.random() * ZeroFucks.length)]);
			// if value 20 do this:
		} else if (sliderValue === 20) {
			useOpenAI(
				"give a specific credible reason of why you can't attend the lecture today in 140 characters"
			).then((reply) => {
				setResponse(reply);
			});
			// if value 40 do this:
		} else if (sliderValue === 40) {
			useOpenAI(
				"give a random story of why you can't attend the lecture today in no more than 250 characters"
			).then((reply) => {
				setResponse(reply);
			});
			// if value 60 do this:
		} else if (sliderValue === 60) {
			setResponse(Hyperified[Math.floor(Math.random() * Hyperified.length)]);
		}
	}

	return (
		<>
			<Cursor />
			<main className="main">
				<ChakraProvider>
					<div className="title">
						<h1>Excuse generator</h1>
						<img src="/sparkels.png" />
					</div>

					<div className="response">
						<CopyToClipboard text={`${response}`} onCopy={onCopyHandler}>
							<div className="response__bubble">
								<p className="response__text">
									{response?.length ? (
										response
									) : (
										<>
											Hi! I can help you spice up your{" "}
											<span>absence channel</span>{" "}
											with cutting edge excuses!
										</>
									)}
								</p>
								<div className="response__triangle"></div>
							</div>
						</CopyToClipboard>
						<img src={displayedImg} className="response__face" />
					</div>

					<form>
						<div className="slider">
							<Slider
								defaultValue={20}
								min={0}
								max={60}
								step={20}
								onChange={(e) => setSliderValue(e)}
								className="slider__thing"
								cursor="none"
							>
								<SliderMark
									value={0}
									mt="5"
									ml="-9"
									fontSize={{ base: "10px", md: "15px" }}
								>
									Zero Fucks Given
								</SliderMark>
								<SliderMark
									value={20}
									mt="5"
									ml="-5"
									fontSize={{ base: "10px", md: "15px" }}
								>
									Credible
								</SliderMark>
								<SliderMark
									value={40}
									mt="5"
									ml="-5"
									fontSize={{ base: "10px", md: "15px" }}
								>
									Fantasy
								</SliderMark>
								<SliderMark
									value={60}
									mt="5"
									ml="-5"
									fontSize={{ base: "10px", md: "15px" }}
								>
									Hyperified
								</SliderMark>

								<SliderTrack
									bg=""
									height="10px"
									border="2px"
									borderColor="#1D2024"
								>
									<SliderFilledTrack bg="#1D2024" />
								</SliderTrack>
								<SliderThumb boxSize={6} bg="#D172A0" />
							</Slider>
						</div>

						<button className="button" onClick={handleOnclick}>
							generate
						</button>
					</form>
				</ChakraProvider>
			</main>
		</>
	);
}

export default App;
