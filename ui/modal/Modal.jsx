import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ showModal, onClose, children }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* max-w-[960px] */}
          <div className="w-full h-full flex items-center justify-center">
            <motion.div
              className=""
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
