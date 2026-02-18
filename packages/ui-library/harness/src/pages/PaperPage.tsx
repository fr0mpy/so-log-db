import { Paper, PaperHeader, PaperTitle, PaperDescription, PaperContent, PaperFooter, Button } from '@stackone-ui/core'

export default function PaperPage() {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <Paper className="w-full max-w-sm p-6">
          <p className="text-sm text-muted-foreground">
            Simple Paper with default depth. Content appears carved into the surface.
          </p>
        </Paper>
        <Paper depth="sm" className="w-full max-w-sm p-6">
          <p className="text-sm text-muted-foreground">
            Paper with subtle (sm) depth for lighter inset effect.
          </p>
        </Paper>
        <Paper className="w-full max-w-sm p-6">
          <a
            href="https://github.com/fr0mpy/so-log-db"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
          >
            GitHub Repo
          </a>
        </Paper>
      </div>
      <Paper className="w-full max-w-md">
        <PaperHeader>
          <PaperTitle>Inward Neumorphic</PaperTitle>
          <PaperDescription>Content that appears carved into the surface.</PaperDescription>
        </PaperHeader>
        <PaperContent>
          <p className="text-sm text-muted-foreground">
            Paper uses inset shadows to create a concave effect, opposite of Card which appears raised.
          </p>
        </PaperContent>
        <PaperFooter>
          <Button variant="ghost" size="sm">Learn more</Button>
        </PaperFooter>
      </Paper>
    </div>
  )
}
