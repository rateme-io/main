import axios from 'axios';

import { RatemeApi } from '@rateme/core/api';
import { AxiosService } from '@rateme/core/api/common/axios.service';

import { env } from '@/shared/config';

export const ratemeApi = new RatemeApi({
  httpService: new AxiosService(
    axios.create({
      baseURL: env.baseUrl,
      withCredentials: true,
    }),
  ),
});
