interface CertificateAttribute {
  trait_type: string;
  value: string;
  display_type?: string; // Optional, only for dates or other specific display formats
}

export interface ipfsMetadata {
  name: string;
  description: string;
  image: string;
  attributes: CertificateAttribute[];
}
