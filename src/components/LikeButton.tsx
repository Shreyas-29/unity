"use client";

import { FC, useState } from "react";
import { Button } from ".";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";


interface LikeButtonProps {
    liked: boolean;
    postId: string;
    handleLike: (postId: string) => Promise<void>;
}

interface Particle {
    x: number;
    y: number;
}

const LikeButton: FC<LikeButtonProps> = ({
    liked,
    postId,
    handleLike,
}) => {

    const [particles, setParticles] = useState<Particle[]>([]);

    const handleLikeClick = async () => {
        await handleLike(postId);

        if (!liked) {

            const newParticles: Particle[] = Array.from({ length: 50 }).map(() => ({
                x: Math.random() * 200,
                y: Math.random() * 200,
            }));

            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
            }, 2500);
        } else {
            setParticles([]);
        }
    };



    return (
        <Button
            size="xxs"
            variant="action"
            title={liked ? "Unlike" : "Like"}
            onClick={handleLikeClick}
            // onClick={() => handleLike(post?.id)}
            className="relative overflow-hidden transition-colors text-slate-800 hover:text-slate-400 active:scale-100"
        >
            <motion.span whileTap={{ scale: 1.2 }}>
                <motion.span
                    initial={false}
                    animate={{ scale: liked ? 1.2 : 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    <Image
                        src={liked ? "/svg/heart-fill.svg" : "/svg/heart.svg"}
                        alt=""
                        width={50}
                        height={50}
                        className={cn("w-5 h-5",
                            // liked ? "scale-110 transition-transform duration-200 ease-in-out" : "heart-pulse"
                        )}
                    />
                </motion.span>
            </motion.span>
            {particles.map((particle, index) => (
                <motion.div
                    key={index}
                    className="confetti-particle z-[1000]"
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                        y: [0, -100],
                        opacity: [1, 0],
                        scale: [0, 1],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeOut",
                        delay: Math.random(),
                    }}
                    style={{
                        position: "absolute",
                        top: `${particle.y}%`,
                        left: `${particle.x}%`,
                        backgroundColor: "#ef4444",
                        // backgroundColor: "rgba(255, 0, 0, 0.8)",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                    }}
                />
            ))}
        </Button>
    );
}

export default LikeButton;