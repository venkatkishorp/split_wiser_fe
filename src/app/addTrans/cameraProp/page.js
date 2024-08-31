'use client'

import { useState } from "react";
import useStore from "@/app/store";
import { useRouter } from "next/navigation";


function Page() {
	const router = useRouter();
	const { setImage } = useStore();

	const videoConstraints = {
		facingMode: { exact: "environment" }
	};

	const webcamRef = useRef(null);

	const captureImage = () => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImage(imageSrc);
	};

	return (
		<Container>
			<Webcam
				videoConstraints={videoConstraints}
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg" />;
			<Button variant="contained" color="primary" onClick={captureImage}>
				Capture Image
			</Button>
		</Container>
	);
}

export default Page;