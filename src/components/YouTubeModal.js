import React, { Component } from "react";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import YouTube from "react-youtube";

const YouTubeModal = ({ video, Component }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);

  return (
    <>
      <Component setOpen={setOpen} />
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-accent-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all">
                  <div className="bg-background-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <span
                      onClick={() => setOpen(false)}
                      className="fixed right-1 top-1 size-6 cursor-pointer rounded-full bg-accent-900 text-center font-extrabold text-font-100 opacity-75"
                    >
                      X
                    </span>
                    <YouTube
                      videoId={video.key}
                      className="w-full"
                      opts={{
                        width: (window.innerWidth * 2) / 3,
                        height: (window.innerHeight * 2) / 3,
                        playerVars: {
                          autoplay: 1,
                        },
                      }}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default YouTubeModal;
