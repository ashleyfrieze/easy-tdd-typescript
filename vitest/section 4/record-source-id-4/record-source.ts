export type RecordSource = {
  deployed?: string;
  machineName?: string;
  debugData?: {
    language: string;
  };
  timestamp?: number;
};

const deployed = process.env.VITE_DEPLOYED_ENVIRONMENT;
const machineName = process.env.VITE_MACHINE_NAME;

const debugData = () =>
  process.env.DEBUG_FLAG === 'true'
    ? { debugData: { language: process.env.LANG || '' } }
    : {};

export const makeSourceMetadata = (): RecordSource => {
  return {
    deployed,
    machineName,
    ...debugData(),
    timestamp: Date.now(),
  };
};
