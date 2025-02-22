export default function HighlightedText({ texts, className, ...props }) {
	return (
		<div className={`${className} flex mt-[20px] relative`} {...props}>
		    <div className="absolute top-0 bottom-0 w-[100px] color-fondo clip-highlight-l"></div>
			<div className="flex flex-col gap-5 pt-2 ml-[20px]">
				{texts.map((text, index) => {
					return (
						<div key={index} className="text-balance whitespace-pre-line">
							{text}
						</div>
					);
				})}
			</div>
		</div>
	);
}
