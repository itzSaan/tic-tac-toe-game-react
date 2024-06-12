
const PlayerModal = ({
  players,
  isModalOpen,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay  bg-slate-900/50 fixed z-50 backdrop-blur-sm left-0 top-0 grid place-content-center w-full h-full">
          <div className="modal w-[24rem] bg-black/60 transition border border-slate-100/10 text-white p-8 rounded-2xl">
            <h2 className="font-bold mb-4 text-center text-xl italic">
              Enter Player Names
            </h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="italic text-sm font-semibold">
                  Player 1
                  <input
                    className="w-full bg-white/10 font-bold text-lg italic text-center p-3 rounded-lg focus:bg-yellow-500/80 outline-none border-none"
                    type="text"
                    name="p1name"
                    value={players.p1name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div>
                <label className="italic text-sm font-semibold">
                  Player 2
                  <input
                    className="w-full bg-slate-100/10 p-3 font-bold text-lg italic text-center rounded-lg focus:bg-yellow-500/80 outline-none border-none"
                    type="text"
                    name="p2name"
                    value={players.p2name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full outline outline-4 outline-green-500 font-bold drop-shadow mt-3 bg-gradient-to-t from-green-700 to-green-400 p-4 text-white  rounded-xl"
              >
                <span className="drop-shadow-xl">Start Game </span>
                <img
                  className="inline"
                  width={16}
                  src="img/right-arrow.svg"
                  alt=""
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerModal;
