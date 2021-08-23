import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import hd4k from "@/assets/hd-4k.svg";
import { useCart } from "@/context/GlobalState";
import { formatMoney } from "@/utils/moneyFormat";
const Header = () => {
  const [open, setOpen] = useState(false);
  const { total, cart } = useCart();
  return (
    <header>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6    md:justify-start  lg:px-8 relative ">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <Link href="/">
            <a className="hidden sm:block">
              <Image
                alt="Basement"
                className="w-48 h-auto hidden sm:block"
                src={logo}
              />
            </a>
          </Link>
          <Link href="/">
            <a className="block sm:hidden">
              <Image alt="Basement" className="w-48 h-auto " src={logoSm} />
            </a>
          </Link>
        </div>
        <div className="hidden md:flex space-x-10">
          <Image
            alt="Basement"
            className=" h-auto"
            aria-hidden="true"
            src={hd4k}
          />
        </div>
        <div className=" flex items-center justify-end md:flex-1 lg:w-0">
          <button
            className="whitespace-nowrap inline-flex items-center justify-center   bg-origin-border px-5 lg:px-8 py-3 border-2 border-white rounded-3xl   text-base   lg:text-lg font-bold text-white lg:leading-5  uppercase tracking-widest"
            onClick={() => setOpen(true)}
          >
            Cart ({cart.length})
          </button>
        </div>
        {/* Position absolute version not certain if it actually makes it more centered or  not */}
        {/* <div className="absolute inset-y-0 left-0 flex items-center  ">
                <Link href="/">
                  <a>
                    <Image alt="Basement" className="w-48 h-auto" src={logo} />
                  </a>
                </Link>
              </div>
              <div className="flex-1 flex items-center justify-center  ">
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    alt="Basement"
                    className=" h-auto"
                    aria-hidden="true"
                    src={hd4k}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center  ">
                <button className="whitespace-nowrap inline-flex items-center justify-center   bg-origin-border px-8 py-3 border-2 border-white rounded-3xl shadow-sm text-lg font-bold text-white leading-5  uppercase tracking-widest">
                  Cart (0)
                </button>
              </div> */}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="flex items-end justify-center lg:justify-end lg:items-start  min-h-screen pt-4 px-4 pb-20 text-center sm:flex sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-black border-l-2 border-b-2 border-white    text-left overflow-hidden shadow-xl transform transition-all lg:my-0 sm:align-middle lg:max-w-screen-md sm:w-full   ">
                <div className="px-4 pt-5 pb-4 sm:p-6">
                  <div className="flex justify-end">
                    <button
                      className="uppercase text-2xl leading-5"
                      onClick={() => setOpen(false)}
                    >
                      → Close
                    </button>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="       text-gray-900 uppercase text-9xl font-bold"
                    >
                      <span className="text-white">Your</span>{" "}
                      <span className="text-black outline-text">Cart</span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Empty</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 border-t-2 text-4xl font-bold uppercase border-white divide-x-2 divide-white">
                  <div className="col-span-2 py-6 pl-8">
                    <p className="text-white ">Total: {formatMoney(total)}</p>
                  </div>
                  <button className="text-black outline-text  text-center py-6 uppercase">
                    Checkout
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
};

export default Header;
