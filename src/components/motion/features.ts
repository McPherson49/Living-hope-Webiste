import { domMax } from "framer-motion";

/**
 * `domMax` (rather than `domAnimation`) because the nav highlight and the doctor
 * filter use layout animations. It is loaded on demand by <MotionProvider>.
 */
export default domMax;
