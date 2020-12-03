

export const EmptyNotificationInformation = () => {
    return (
        <>
        <EmptyNotificationsContainer>
        <Container>
              <SecondInputContainer>
                <AlgoliaPlaces
                  placeholder="Write depart address"
                  name={"departure"}
                  options={{
                    appId: "plEXDWG96G11",
                    apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                    language: "fr",
                    countries: ["fr"],
                    type: "address",
                  }}
                  onChange={this.handleChangeDeparture}
                  onSuggestions={({ rawAnswer, query, suggestions }) =>
                    console.log(
                      "Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed."
                    )
                  }
                  onCursorChanged={({
                    rawAnswer,
                    query,
                    suggestion,
                    suggestonIndex,
                  }) =>
                    console.log(
                      "Fired when arrows keys are used to navigate suggestions."
                    )
                  }
                  onClear={() =>
                    console.log("Fired when the input is cleared.")
                  }
                  onLimit={({ message }) =>
                    console.log(
                      "Fired when you reached your current rate limit."
                    )
                  }
                  onError={({ message }) =>
                    console.log(
                      "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
                    )
                  }
                />
              </SecondInputContainer>
              <SecondInputContainer>
                <AlgoliaPlaces
                  placeholder="Write an address here"
                  name={"destination"}
                  options={{
                    appId: "plEXDWG96G11",
                    apiKey: "45fcb12e9304daabbb2dfc2a4a12271a",
                    language: "fr",
                    countries: ["fr"],
                    type: "address",
                    // Other options from https://community.algolia.com/places/documentation.html#options
                  }}
                  onChange={({
                    query,
                    rawAnswer,
                    suggestion,
                    suggestionIndex,
                  }) =>
                    console.log(
                      "Fired when suggestion selected in the dropdown or hint was validated."
                    )
                  }
                  onClear={() =>
                    console.log("Fired when the input is cleared.")
                  }
                  onLimit={({ message }) =>
                    console.log(
                      "Fired when you reached your current rate limit."
                    )
                  }
                  onError={({ message }) =>
                    console.log(
                      "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
                    )
                  }
                />
              </SecondInputContainer>
              <SecondInputContainer>
                <Link
                  style={{
                    display: "flex",
                    position: "relative",
                    width: "100%",
                  }}
                  to={"/home/search/start"}
                >
                  <Input
                    name="start"
                    type={"text"}
                    onChange={this.handleChange}
                    value={this.state.location}
                    placeholder="Start"
                  />
                </Link>
                <ToggleButtonContainer>
                  <Icon2 src={calendar} />
                </ToggleButtonContainer>
              </SecondInputContainer>

              <ButtonContainer2>
                <BlueButtonLoading
                  size="small"
                  isLoading={this.state.loading}
                  onClick={() => this.onUp()}
                >
                  -
                </BlueButtonLoading>
                {12}
                <BlueButtonLoading
                  size="small"
                  isLoading={this.state.loading}
                  onClick={() => this.onDown()}
                >
                  +
                </BlueButtonLoading>
              </ButtonContainer2>

              <ButtonContainer>
                <BlueButtonLoading
                  isLoading={this.state.loading}
                  onClick={() => this.handleForm()}
                >
                  <FormattedMessage id={"global.search"} />
                </BlueButtonLoading>
              </ButtonContainer>
            </Container> 
        </EmptyNotificationsContainer>
        <MenuBar />
        </>
    )
}