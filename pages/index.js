import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input, Typography, Button, Space, notification } from "antd";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const { Title, Paragraph } = Typography;

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

export default function Home() {
  const [address, setAddress] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [switchLoading, setSwitchLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: "Email has been sent successfully",
      description: "Hurray! The email has been sent successfully",
      btn,
      key,
      onClose: close,
    });
  };

  const emailAPI = async (emailaddress) => {
    // Trigger loading animation
    setSwitchLoading(true);
    //
    let response = await axios.get(
      "https://send-email-using-node-mailer.vercel.app/send/" + emailaddress
    );

    // On completion stop the animation
    if (response?.data?.status === 200) {
      setApiResponse(response?.data?.status);
      setSwitchLoading(false);
      openNotification("success");
    }
  };

  return (
    <>
      <Head>
        <title>Automated Email Sender</title>
        <meta name="description" content="Created by Daniel Essien" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title}>
            <Title>Automated Email Sender</Title>
          </div>
          <Paragraph>Input your email address </Paragraph>
          {contextHolder}
          <Space.Compact style={{ width: "100%" }}>
            <Input
              placeholder="user@example.com"
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(e.target.value);
              }}
            />
            <Button
              type="primary"
              onClick={() => emailAPI(address)}
              loading={switchLoading}
            >
              Submit
            </Button>
          </Space.Compact>
        </div>
      </main>
    </>
  );
}
