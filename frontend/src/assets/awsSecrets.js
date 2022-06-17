// import { company } from "../env";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const getSecrets = async (company) => {
  let secret_name = `dev/healiom`;
  let client = new SecretsManagerClient({
    region: "us-east-2",
    credentials: {
      accessKeyId: "AKIA2WUJAEHPJHJYA2O3",
      secretAccessKey: "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",
    },
  });
  const command = new GetSecretValueCommand({
    SecretId: secret_name,
  });
  const secretResponse = await client.send(command);
  return JSON.parse(secretResponse?.SecretString);
};

const configSecret = await getSecrets("healiom");

export { configSecret };
