import { Input } from "@/components/ui/input"
import { FormFieldsProps } from "@/components/auth/primitives/name-fields"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface PassFieldsProps extends FormFieldsProps {
  confirmPassword?: boolean
}

export default function PassField({ control, confirmPassword }: PassFieldsProps) {
  return (
    <div className="flex flex-col gap-5">
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs tracking-wider text-zinc-500">Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="••••••••"
                {...field}
                className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-700 h-11"
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      {confirmPassword && (
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs tracking-wider text-zinc-500">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-700 h-11"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      )}
    </div>
  )
}
