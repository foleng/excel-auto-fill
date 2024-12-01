import * as XLSX from 'xlsx';

export const readExcel = async (file: File) => {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

export const saveHistory = async (data: any) => {
  const history = (await chrome.storage.local.get('history')).history || [];
  history.push({ id: Date.now(), data });
  await chrome.storage.local.set({ history });
};

export const getHistory = async () => {
  console.log('getHistory', (await chrome.storage.local.get('history')), chrome.storage.local);

  const result = await chrome.storage.local.get('history');
  return result.history || [];
};

export const deleteHistory = async (id: number) => {
  const history = (await chrome.storage.local.get('history')).history || [];
  const updatedHistory = history.filter((item: any) => item.id !== id);
  await chrome.storage.local.set({ history: updatedHistory });
};
