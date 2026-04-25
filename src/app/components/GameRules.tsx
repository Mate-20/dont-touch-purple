type GameRulesProps = {
    setHowToPlay: (howToPlay: boolean) => void;
};

const GameRules = ({ setHowToPlay }: GameRulesProps) => {

    const handleClose = () => {
        setHowToPlay(false);
        window.localStorage.setItem("howToPlay", "true");
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-rules-title"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/70"
                onClick={() => setHowToPlay(false)}
                aria-label="Close rules modal"
            />

            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#121212] p-5 text-white shadow-2xl">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div id="game-rules-title" className="text-xl font-semibold">
                            Game Rules
                        </div>
                        <div className="mt-1 text-sm text-white/70">
                            Quick guide before you start.
                        </div>
                    </div>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/85">
                    <li>Different colors will appear on the blocks, don&apos;t touch purple.</li>
                    <li>Don&apos;t let the blocks fill completely.</li>
                </ul>

                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full border border-purple-500 bg-purple-500/10 px-5 py-2 text-sm font-medium hover:bg-purple-500/20 transition"
                        style={{ boxShadow: `1px 0px 5px #c74fff` }}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameRules;