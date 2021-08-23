import { Fragment, useState } from "react";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import logoSm from "@/assets/logo-sm.svg";
import hd4k from "@/assets/hd-4k.svg";
import { useCart } from "@/context/GlobalState";
import { formatMoney } from "@/utils/moneyFormat";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Header = () => {
  // let [plan, setPlan] = useState("startup");
  const {
    total,
    cart,
    cartModal,
    toogleModal,
    setOption,
    addToCart,
    removeByOneFromCart,
  } = useCart();
  return (
    <header>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6    md:justify-start  lg:px-8 relative ">
        <div className="flex justify-start sm:w-0 sm:flex-1">
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
        <div className="hidden sm:flex  ">
          <Image
            alt="Basement"
            className=" h-auto"
            aria-hidden="true"
            src={hd4k}
          />
        </div>
        <div className=" flex items-center justify-end sm:flex-1 sm:w-0">
          <button
            className="whitespace-nowrap inline-flex items-center justify-center   bg-origin-border px-5 lg:px-8 py-3 border-2 border-white rounded-3xl   text-sm leading-4   lg:text-lg font-bold text-white lg:leading-5  uppercase tracking-widest"
            onClick={() => toogleModal(true)}
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
      <Transition.Root show={cartModal} as={Fragment}>
        <Dialog
          as="div"
          auto-reopen="true"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={toogleModal}
        >
          <div className="flex  items-stretch justify-items-stretch lg:justify-end lg:items-start  min-h-screen   text-center  ">
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
              <div className="sm:inline-block flex flex-col justify-between  bg-black sm:border-l-2 sm:border-b-2 border-white    text-left overflow-hidden shadow-xl transform transition-all lg:my-0 sm:align-middle lg:max-w-[824px] sm:w-full   flex-1  sm:h-auto">
                <div className="px-4 pt-4 pb-4 sm:p-6">
                  <div className="flex justify-end">
                    <button
                      className="uppercase sm:text-2xl sm:leading-5 text-sm"
                      onClick={() => toogleModal(false)}
                    >
                      → Close
                    </button>
                  </div>
                  <div className="mt-1.5  sm:mt-5">
                    <Dialog.Title
                      as="h2"
                      className="text-center text-gray-900 uppercase text-[7rem] leading-none text-9xl font-bold"
                    >
                      <span className="text-white">Your</span>{" "}
                      <span className="text-black outline-text">Cart</span>
                    </Dialog.Title>
                    <div className="mt-2">
                      <ul className="space-y-6">
                        {cart.map(
                          ({ product, quantity, optionSelected }, index) => {
                            return (
                              <li
                                className="border-2 border-white   "
                                key={product.id}
                              >
                                <div className="flex  ">
                                  <div className="p-2 sm:p-3.5  flex-shrink-0">
                                    <div className="bg-gradient-to-b from-basement-dark/0  to-basement-light   relative">
                                      <div className="hidden sm:block">
                                        <Image
                                          alt={product.name}
                                          height={234}
                                          width={234}
                                          objectFit="contain"
                                          src={product.image}
                                        />
                                      </div>
                                      <div className="block sm:hidden">
                                        <Image
                                          alt={product.name}
                                          height={104}
                                          width={104}
                                          objectFit="contain"
                                          src={product.image}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex pt-2 pr-3.5 pb-3 justify-between  flex-col ml-2 sm:ml-4 flex-1 ">
                                    <div className="text-left flex-1 ">
                                      <h3 className="text-white text-sm leading-4 sm:text-4xl uppercase font-bold">
                                        {product.name}
                                      </h3>
                                      <p className="text-basement-gray mt-2 text-xxs sm:text-xl sm:leading-5 font-bold">
                                        {product.description}
                                      </p>
                                    </div>
                                    <div className="sm:mt-0 mt-2">
                                      <div className="flex items-center ">
                                        <p className="sm:text-xl text-xxs uppercase sm:leading-5 font-bold tracking-wide">
                                          Quantity:
                                        </p>
                                        <span className="ml-4 rounded-3xl border-2 border-white px-2 sm:px-3.5 sm:text-xl sm:leading-5 text-xxs py-1 sm:space-x-1.5 space-x-1">
                                          <button
                                            onClick={() =>
                                              removeByOneFromCart(product)
                                            }
                                          >
                                            -
                                          </button>
                                          <span>{quantity}</span>
                                          <button
                                            onClick={() => addToCart(product)}
                                          >
                                            +
                                          </button>
                                        </span>
                                      </div>
                                      <div className="flex sm:justify-between md:flex-row flex-col sm:mt-2 mt-1">
                                        {product.options.map((option) => (
                                          <RadioGroup
                                            value={optionSelected}
                                            key={option.label}
                                            onChange={(value) =>
                                              setOption(index, value)
                                            }
                                            className="flex items-center"
                                          >
                                            <RadioGroup.Label className="sm:text-xl text-xxs uppercase sm:leading-5 font-bold tracking-wide">
                                              {option.label}
                                            </RadioGroup.Label>
                                            <div className="ml-4 flex space-x-2">
                                              {option.values.map((row) => (
                                                <RadioGroup.Option
                                                  key={row}
                                                  value={row}
                                                >
                                                  {({ checked }) => (
                                                    <span
                                                      className={classNames(
                                                        checked
                                                          ? "border-white"
                                                          : "border-transparent",
                                                        "sm:w-10 sm:h-10 w-5 h-5  border-2 text-xxs sm:text-xl sm:leading-5 flex items-center justify-center rounded-full cursor-pointer"
                                                      )}
                                                    >
                                                      {row}
                                                    </span>
                                                  )}
                                                </RadioGroup.Option>
                                              ))}
                                            </div>
                                          </RadioGroup>
                                        ))}
                                        <div className=" ">
                                          <p className="text-sm sm:text-4xl font-bold uppercase">
                                            {formatMoney(
                                              product.price * quantity
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 sm:border-t-2 text-4xl font-bold uppercase border-white sm:divide-x-2 sm:divide-y-0 divide-y-2 divide-white sm:p-0 p-4">
                  <div className="sm:col-span-2 sm:py-6 sm:pl-8 pb-5">
                    <p className="text-white flex justify-between sm:block">
                      Total<span className="hidden sm:inline-block">:</span>{" "}
                      <span>{formatMoney(total)}</span>
                    </p>
                  </div>
                  <button className="text-black font-black outline-text text-5xl tracking-[7px] sm:text-4xl sm:tracking-normal  text-center py-6 uppercase">
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
