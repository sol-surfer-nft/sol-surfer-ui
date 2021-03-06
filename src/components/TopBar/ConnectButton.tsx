import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { ButtonProps } from "antd/lib/button";
import { useWallet } from "../../contexts/wallet";

export interface ConnectButtonProps
  extends ButtonProps,
    React.RefAttributes<HTMLElement> {
  allowWalletChange?: boolean;
}

export const ConnectButton = (props: ConnectButtonProps) => {
  const { connected, connect, select, provider } = useWallet();
  const { onClick, children, disabled, allowWalletChange, ...rest } = props;

  // only show if wallet selected or user connected

  const menu = (
    <Menu>
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  if (!provider || !allowWalletChange) {
    return (
      <Button
        {...rest}
        onClick={connected ? onClick : connect}
        disabled={connected && disabled}
        id="tour-1-wallet"
      >
        {connected ? props.children : "Connect"}
      </Button>
    );
  }

  return (
    <Dropdown.Button
      onClick={connected ? onClick : connect}
      disabled={connected && disabled}
      overlay={menu}
    >
      <span id="tour-1-wallet">Connect</span>
    </Dropdown.Button>
  );
};
