import { useState } from "react";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import css from "./App.module.css";
import type { Votes } from "../../types/votes";

import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const totalVotes = votes.good + votes.neutral + votes.bad;

  const updateVotes = (key: keyof Votes) => {
    setVotes({
      ...votes,
      [key]: votes[key] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const [canReset, setCanReset] = useState(false);

  const handleVote = (voteType: keyof Votes) => {
    updateVotes(voteType);
    setCanReset(true);
  };

  const handleResetVotes = () => {
    resetVotes();
    setCanReset(false);
  };

  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions
          onVote={handleVote}
          onReset={handleResetVotes}
          canReset={canReset}
        />
      </div>
    </>
  );
}

export default App;
