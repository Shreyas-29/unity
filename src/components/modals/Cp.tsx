"use client";

import { FC, FormEvent, useRef, useState } from 'react';
import { Button } from '..';
import { toast } from '@/hooks';

interface CreatePostModalProps {
    createPost: (postData: FormData) => Promise<void>;
}

const Cp: FC<CreatePostModalProps> = ({
    createPost
}) => {

    const ref = useRef<HTMLFormElement>(null);

    const [image, setImage] = useState<string>("");

    const handleImageChange = () => {
        setImage(image);
    };

    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();

    //     if (!ref.current) return;
    //     const formData = new FormData(ref.current);
    //     const content = formData.get("content");
    //     const location = formData.get("location");
    //     const image = formData.get("image");

    //     if (!content || !location || !image) {
    //         return toast({
    //             title: "Something went wrong",
    //             description: "All fields are required. Please try again.",
    //             variant: "destructive"
    //         });
    //     }

    //     await createPost(formData)
    //         .then(() => {
    //             ref.current?.reset();
    //             setImage("");
    //             toast({
    //                 description: "Your post was published! 🎉",
    //             });
    //         })
    // };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!ref.current) return;
        const formData = new FormData(ref.current);
        const content = formData.get("content");
        const location = formData.get("location");
        const img = formData.get("image");

        if (!content || !location || !img) {
            return toast({
                title: "Something went wrong",
                description: "All fields are required. Please try again.",
                variant: "destructive"
            });
        }

        await createPost(formData)
            .then(() => {
                ref.current?.reset();
                // createPostModal.onClose();
                setImage("");
                toast({
                    description: "Your post was published! 🎉",
                });
            })
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    description: "Could not create post. Please try again",
                    variant: "destructive"
                })
            })
    };

    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();

    //     if (!ref.current) return;
    //     const formData = new FormData(ref.current);
    //     const content = formData.get("content");
    //     const location = formData.get("location");
    //     const image = formData.get("image");

    //     console.log("data", content, location, image);

    //     if (!content || !location || !image) {
    //         return toast({
    //             title: "Something went wrong",
    //             description: "All fields are required. Please try again.",
    //             variant: "destructive"
    //         });
    //     }

    //     await createPost(formData)
    //         .then(() => {
    //             ref.current?.reset();
    //             // createPostModal.onClose();
    //             setImageUrl("");
    //             toast({
    //                 description: "Your post was published! 🎉",
    //             });
    //         })
    //         .catch(() => {
    //             toast({
    //                 title: "Something went wrong",
    //                 description: "Could not create post. Please try again",
    //                 variant: "destructive"
    //             })
    //         })
    // };

    return (
        <div>
            <form
                ref={ref}
                // action={async (formData) => {
                //     ref.current?.reset();

                //     await createPost(formData);
                // }}
                onSubmit={handleSubmit}
                className='flex flex-col items-center justify-center max-w-md gap-2 py-8'
            >
                <input
                    type="text"
                    name="content"
                    placeholder="Enter caption here..."
                    className="px-4 py-2 border rounded-md outline-none"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Enter location here..."
                    className="px-4 py-2 border rounded-md outline-none"
                />
                <input
                    type="text"
                    name="image"
                    value={image}
                    placeholder="Enter image url here..."
                    onChange={(e) => setImage(e.target.value)}
                    className="px-4 py-2 border rounded-md outline-none"
                />
                {/* {image && (
                    <img src={image} alt="" className='object-cover w-full h-40 rounded-lg' />
                )} */}
                <label htmlFor="audience">Select audience:</label>
                <select name="audience" id="audience">
                    Select audience
                    <option value="public">
                        public
                    </option>
                    <option value="friends">
                        friends
                    </option>
                    <option value="private">
                        private
                    </option>
                </select>
                <Button type="submit" className="w-full">
                    Post
                </Button>
            </form>
        </div>
    )
}

export default Cp
