import {
  deleteHistory,
  getHistory,
  readExcel,
  saveHistory,
} from '@/services/storage';
import { UploadOutlined } from '@ant-design/icons';
import { Button, List, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';

const Popup = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [tableVisible, setTableVisible] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data || []);
  };

  const handleUpload = async (file: File) => {
    try {
      const data = await readExcel(file);
      await saveHistory(data);
      message.success('Excel 数据已保存到历史记录！');
      loadHistory();
    } catch (err) {
      message.error('上传失败，请检查文件格式！');
    }
  };

  const handleDelete = async (id: number) => {
    await deleteHistory(id);
    message.success('记录已删除');
    loadHistory();
  };

  const handleFillForm = (data: any) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: fillFormInPage,
          args: [data],
        });
      }
    });
  };

  const fillFormInPage = (data: any) => {
    for (const field in data) {
      const input = document.querySelector(
        `[name="${field}"]`,
      ) as HTMLInputElement;
      if (input) input.value = data[field];
    }
  };

  const handleNewTable = () => {
    const url = chrome.runtime.getURL('table.html');
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '10px', width: 300 }}>
      <h3>Excel 自动填充工具</h3>
      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false; // 阻止自动上传
        }}
      >
        <Button icon={<UploadOutlined />}>上传 Excel</Button>
      </Upload>
      <Button type="primary" onClick={handleNewTable} style={{ marginTop: 10 }}>
        新建表格
      </Button>
      <List
        header="历史记录"
        dataSource={history}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={() => handleFillForm(item.data)}>
                一键导入
              </Button>,
              <Button danger onClick={() => handleDelete(item.id)}>
                删除
              </Button>,
            ]}
          >
            记录 #{item.id}
          </List.Item>
        )}
        style={{ marginTop: 10 }}
      />
    </div>
  );
};

export default Popup;
