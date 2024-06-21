export type RecordSource = {
  deployed?: string;
  machineName?: string;
  debugData?: {
    language: string;
  };
  timestamp?: number;
};

export const makeSourceMetadata = (): RecordSource => {
  const debugData =
    process.env.DEBUG_FLAG === 'true'
      ? { debugData: { language: process.env.LANG || '' } }
      : {};
      
  return {
    deployed: process.env.DEPLOYED_ENVIRONMENT,
    machineName: process.env.MACHINE_NAME,
    ...debugData,
  };
};
