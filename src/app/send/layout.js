"use client";
import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useContractRead, useContractEvent } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { useSelector, useDispatch } from "react-redux";
import {
    addUserAddress,
    changeWalletConnectionState,
    setAllAvailableTokens,
} from "@/redux/aikiSend";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const Layout = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const { isConnected, address } = useAccount();
    const dispatch = useDispatch();
    const walletConnected = useSelector(
        (state) => state.aikiSend.walletConnected
    );

    const setTokens = async () => {
        // await Moralis.start({
        //     apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
        //     // ...and any other configuration
        // });

        const chain = EvmChain.GOERLI;

        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address,
            chain,
        });

        dispatch(setAllAvailableTokens(response.toJSON()));
        console.log(response.toJSON());
    };

    useEffect(() => {
        dispatch(changeWalletConnectionState(isConnected));
        dispatch(addUserAddress(address || ""));
        console.log(address);
        if (address) {
            setTokens();
        }
    }, [isConnected]);

    const { open, close } = useWeb3Modal();

    return (
        <main className="flex h-full flex-col">
            <nav className="px-24 pt-8 pb-8 flex justify-between items-center">
                <h1 className="font-extrabold text-3xl">AIKISEND</h1>
                <button
                    onClick={() => open()}
                    className={`transition-all text-lg hover:scale-110 duration-200 shadow-neo-brutalism-sm border-[3px] border-black px-3 py-1 rounded-lg  ${
                        walletConnected
                            ? "text-black font-extrabold font-sans tracking-[0.3em]"
                            : "bg-blue-500 text-white  font-semibold tracking-[0.1em] "
                    }`}
                >
                    {walletConnected
                        ? address &&
                          address
                              .substring(0, 4)
                              .concat(`...${address.slice(-4)}`)
                        : "Connect Wallet"}
                </button>
            </nav>
            {children}
        </main>
    );
};

export default Layout;