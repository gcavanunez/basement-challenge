import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";

import { Product } from "@/product/types";

import header from "@/assets/header.svg";
import asterisk from "@/assets/asterisk.svg";
import AsteriskIcon from "@/assets/asterisk.icon.svg";
import asteriskAlt from "@/assets/asterisk-alt.svg";
import globe from "@/assets/globe.svg";
import { useCart } from "@/context/GlobalState";

interface Props {
  products: Product[];
}
import { formatMoney } from "@/utils/moneyFormat";
const phrase = "A man can’t have enough base­ment swag";
const Home: NextPage<Props> = ({ products }) => {
  console.log(products);
  const { addToCart } = useCart();
  return (
    <>
      <section className="max-w-screen-xl mx-auto lg:px-8 px-4">
        <Image alt="Basement supply" src={header} />
      </section>
      <section className="relative  border-t-2 border-b-2 border-white py-3.5 mt-4 sm:mt-16">
        <div className="max-w-screen-xl sm:flex hidden mx-auto relative">
          <div className="absolute right-0 -top-28 mr-16   ">
            <Image
              alt=""
              aria-hidden="true"
              height="144"
              src={asteriskAlt}
              width="144"
            />
          </div>
          <div className="absolute left-0 -top-4 ml-16 ">
            <Image alt="" aria-hidden="true" src={asterisk} />

            {/* <AsteriskIcon /> */}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="whitespace-nowrap  marquee">
            <p className="sm:text-4xl text-xl   ">
              {Array(6).fill(phrase).join("  —  ")}  
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-screen-xl mx-auto mt-28 px-4 lg:px-8">
        <ul className="grid lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <li key={product.id} className=" ">
              <div>
                <div className="bg-gradient-to-b from-basement-dark/0  to-basement-light border-b-2 border-white relative">
                  <Image
                    alt={product.name}
                    height={512}
                    layout="responsive"
                    src={product.image}
                    width={512}
                  />
                  <div className="absolute inset-0 w-full h-full   flex items-center justify-center   opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <div className="absolute inset-0 w-full h-full   flex items-center justify-center ">
                      <Image
                        aria-hidden="true"
                        height={128}
                        src={globe}
                        width={128}
                      />
                    </div>
                    <button
                      className="relative uppercase text-3xl text-transparent font-bold   text-black outline-text"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-2   text-xl ">
                  <p>{product.name}</p>
                  <p>{formatMoney(product.price)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products: Product[] = await import("@/product/mock.json").then(
    (res) => res.default
  );

  return {
    props: {
      products,
    },
  };
};
export default Home;
