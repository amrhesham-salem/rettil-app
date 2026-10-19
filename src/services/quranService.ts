import { api } from '../lib';
import { API_ENDPOINTS } from '../config/endpoints';

export interface SurahItem {
  id: number;
  surah_number: number;
  name: string;
}

export const quranService = {
  async getSurahsByJuz(juzNumber: number): Promise<SurahItem[]> {
    const { data } = await api.get<SurahItem[]>(API_ENDPOINTS.quran.surahs, {
      params: { juz: juzNumber },
    });
    return Array.isArray(data) ? data : [];
  },
};