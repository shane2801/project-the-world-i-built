import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props { children: ReactNode; onFailure: () => void }
interface State { failed: boolean }

export class SceneBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() {
    return this.state.failed ?
      <p role="alert">The 3D view could not start. Use the chapter controls below, retry 3D, or reload this page.</p> :
      this.props.children;
  }
}
