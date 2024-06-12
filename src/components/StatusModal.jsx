const StatusModal = ({ 
    winner, 
    isStatusModalOpen,
    handleHomeButton, 
    handleClick,
    players
 }) => {
  return (
    <>
      {isStatusModalOpen && (
        <div className="modal-overlay backdrop-blur-sm bg-slate-900/50 fixed z-50  left-0 top-0 grid place-content-center w-full h-full">
          <div className="modal transition relative w-[24rem] bg-black/80 px-8 pt-16 pb-8 border border-slate-200/20 rounded-2xl">
            <img className="absolute inset-x-0 -top-32" src={winner === 'Draw' ? 'img/draw.png' : "img/win.png" }alt={winner} />
            {winner === "Draw" ? (
              <div className="text-center flex flex-col justify-center gap-3 py-3">
                <span className="font-bold text-2xl text-white">
                  It's a Draw!
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-3 py-3">
                <img
                  src={`${winner === "X" ? "img/x.png" : "img/o.png"}`}
                  alt=""
                  width={64}
                />
                <span className="font-bold text-2xl text-white">
                  {`${winner === 'X' ? players.p1name : players.p2name}`} Won This Round!
                </span>
              </div>
            )}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleHomeButton}
                className="font-bold w-16 outline outline-4 outline-green-500 drop-shadow mt-3 bg-gradient-to-t from-green-700 to-green-400 p-4 text-white w-14 h-14 rounded-xl"
              >
                <img className="inline" width={28} src="img/home.svg" alt="" />
              </button>
              <button
                type="submit"
                onClick={handleClick}
                className="w-full outline outline-4 outline-green-500 font-bold drop-shadow mt-3 bg-gradient-to-t from-green-700 to-green-400 p-4 text-white w-14 h-14 rounded-xl"
              >
                <span className="drop-shadow-xl">Next Game </span>
                <img
                  className="inline"
                  width={16}
                  src="img/right-arrow.svg"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusModal;
