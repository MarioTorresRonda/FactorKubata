import TeamView from "./ExpandedView/TeamView";
import { useMessageText } from "@/hooks/useMessageText";

export default function ExpandedView({ blue, red }) {

    const getText = useMessageText();

	return (
		<div className="flex sm:flex-row flex-col justify-between text-sm">
			<TeamView team={blue} side={getText(["home", "matches", "side0" ])} />
            <TeamView team={red} side={getText(["home", "matches", "side1" ])} />
		</div>
	);
}
