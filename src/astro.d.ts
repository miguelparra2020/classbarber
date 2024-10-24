// astro.d.ts
declare module '*.astro' {
    const content: any;
    export default content;
  }
  
  declare global {
    interface ImportMeta {
        glob: (globPath: string, options?: { eager?: boolean }) => Record<string, { default: any }>;
      }
  }
  