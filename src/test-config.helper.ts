import { TestBed, TestBedStatic } from '@angular/core/testing';

type CompilerOptions = Partial<{
  providers: unknown[];
  useJit: boolean;
  preserveWhitespaces: boolean;
}>;
export type ConfigureFn = (testBed: typeof TestBed) => void;

export const configureTests = (configure: ConfigureFn, compilerOptions: CompilerOptions = {}) => {
  const compilerConfig: CompilerOptions = {
    preserveWhitespaces: false,
    ...compilerOptions
  };

  const configuredTestBed: TestBedStatic = TestBed.configureCompiler(compilerConfig) as unknown as TestBedStatic;

  configure(configuredTestBed as TestBedStatic);

  return configuredTestBed.compileComponents().then(() => configuredTestBed);
};
