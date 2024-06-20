export type RecordSource = {
  deployed?: string;
  machineName?: string;
  debugData?: {
    language: string;
  };
  timestamp?: number;
};

const deployed = process.env.DEPLOYED_ENVIRONMENT;
const machineName = process.env.MACHINE_NAME;

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
